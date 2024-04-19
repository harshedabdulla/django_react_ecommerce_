from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Cart, User
from .serializers import CartSerializer
from product.models import Product
from product.serializers import ProductSerializer

class CartView(APIView):

    def get(self, request):
        try:
            user = User.objects.get(id=request.user.id)
            obj = Cart.objects.get(user=user)
            products = obj.products.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Cart.DoesNotExist:
            return Response({"detail": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)

class AddProductToCartView(APIView):

    def post(self, request):
        product_id = request.data.get('product_id')
        user_cart = Cart.objects.get(user=request.user)
        
        try:
            product = Product.objects.get(id=product_id)
            user_cart.products.add(product)
            serializer = CartSerializer(user_cart)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

class RemoveProductFromCartView(APIView):

    def post(self, request):
        product_id = request.data.get('product_id')
        user_cart = Cart.objects.get(user=request.user)

        try:
            product = Product.objects.get(id=product_id)
            user_cart.products.remove(product)
            serializer = CartSerializer(user_cart)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found in the cart."}, status=status.HTTP_404_NOT_FOUND)
