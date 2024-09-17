from rest_framework import serializers
from .models import Order
from product.serializers import ProductSerializer

class OrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'date', 'cost', 'products']

    def get_products(self, obj):
        # Assuming the `products` field is a related name for products in the Order model
        return [product.name for product in obj.products.all()]
