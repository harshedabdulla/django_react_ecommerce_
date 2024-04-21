from rest_framework import serializers
from category.serializers import CategorySerializer  # Import the CategorySerializer
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()  # Use CategorySerializer

    class Meta:
        model = Product
        fields = '__all__'
