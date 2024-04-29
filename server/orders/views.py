from django.conf import settings
from django.shortcuts import render
import razorpay
# Create your views here.
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .models import Order
from cart.models import Cart
from .serializers import OrderSerializer


razorpay_client = razorpay.Client(
	auth=(settings.RAZOR_KEY_ID, settings.RAZOR_KEY_SECRET))

@csrf_exempt
def paymenthandler(request):
	# only accept POST request.
	if request.method == "POST":
		try:
		
			# get the required parameters from post request.
			payment_id = request.POST.get('razorpay_payment_id', '')
			razorpay_order_id = request.POST.get('razorpay_order_id', '')
			order = Order.objects.get(razorpay_order_id=razorpay_order_id)
			signature = request.POST.get('razorpay_signature', '')
			params_dict = {
				'razorpay_order_id': razorpay_order_id,
				'razorpay_payment_id': payment_id,
				'razorpay_signature': signature
			}

			# verify the payment signature.
			result = razorpay_client.utility.verify_payment_signature(
				params_dict)
			if result is not None:
				try:

					# capture the payemt
					razorpay_client.payment.capture(payment_id, order.razorpay_amount)
					order.payment_status="done"
					order.save()

					# render success page on successful caputre of payment
					return Response({"status":"success"}, status=status.HTTP_200_OK)
				except:

					# if there is an error while capturing payment.
					return Response({"status":"fail"}, status=status.HTTP_200_OK)
			else:

				# if signature verification fails.
				return Response({"status":"fail"}, status=status.HTTP_200_OK)
		except:

			# if we don't find the required parameters in POST data
			return Response({"status":"fail"}, status=status.HTTP_200_OK)
	else:
	# if other than POST request is made.
		return Response({"status":"fail"}, status=status.HTTP_200_OK)

	
class CreateOrderView(APIView):

	def post(self, request):
		user = request.user
		cart = Cart.objects.get(user=user)
		cost = sum(product.price for product in cart.products.all())
		
		razorpay_order = razorpay_client.order.create(dict(amount=cost,
													currency="INR",
													payment_capture='0'))
		
		razorpay_order_id = razorpay_order['id']

		order = Order.objects.create(
			user=user,
			payment_status="Pending",
			cost=cost,
			razorpay_order_id=razorpay_order_id,
			razorpay_merchant_key=settings.RAZOR_KEY_ID,
			razorpay_amount=cost,
			currency="INR",
			callback_url = 'http://127.0.0.1:8000/orders/paymenthandler/'
		)
		
		order.products.set(cart.products.all())
		cart.products.clear()

		serializer = OrderSerializer(order)
		return Response(serializer.data, status=status.HTTP_201_CREATED)

class OrderView(APIView):

	def get(self, request):
		orders = Order.objects.filter(user=request.user)
		serializer = OrderSerializer(orders, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)
	
class UpdateOrderStatusView(APIView):

	def patch(self, request, pk):
		order = Order.objects.get(id=pk)

		payment_status = request.data.get('payment_status')
		delivery_status = request.data.get('delivery_status')

		if payment_status:
			if payment_status in dict(Order.PAYMENT_STATUS_CHOICES).keys():
				order.payment_status = payment_status
			else:
				return Response({"detail": "Invalid payment status."}, status=status.HTTP_400_BAD_REQUEST)

		if delivery_status:
			if delivery_status in dict(Order.DELIVERY_STATUS_CHOICES).keys():
				order.delivery_status = delivery_status
			else:
				return Response({"detail": "Invalid delivery status."}, status=status.HTTP_400_BAD_REQUEST)
		order.save()
		serializer = OrderSerializer(order)
		return Response(serializer.data, status=status.HTTP_200_OK)