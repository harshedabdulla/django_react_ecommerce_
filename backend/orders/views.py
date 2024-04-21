from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Order
from cart.models import Cart
from .serializers import OrderSerializer

class CreateOrderView(APIView):

    def post(self, request):
        user = request.user
        cart = Cart.objects.get(user=user)
        cost = sum(product.price for product in cart.products.all())
        
        order = Order.objects.create(
            user=user,
            payment_status="Pending",
            cost=cost
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