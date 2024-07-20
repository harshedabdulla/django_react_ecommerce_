from rest_framework import serializers
from category.serializers import CategorySerializer  # Import the CategorySerializer
from .models import Product, Rating

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()  # Use CategorySerializer

    class Meta:
        model = Product
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    category = CategorySerializer()  # Use CategorySerializer

    class Meta:
        model = Rating
        fields = '__all__'
