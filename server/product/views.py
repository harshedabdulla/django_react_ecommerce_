from .models import Product, Rating
from rest_framework import status
from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import ProductSerializer, RatingSerializer
from django.db.models import Count
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.decorators import permission_classes


class ProductView(APIView):

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class TopProductsView(APIView):

    def get(self, request):
        # Annotate products with the number of orders they are in
        products = Product.objects.annotate(order_count=Count('order')).order_by('-order_count')[:5]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class ProductCategoryView(APIView):

    def get(self, request, category_name):
        try:
            print(request.user)
            products = Product.objects.filter(category__name=category_name)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"detail": "No products found for this category."}, status=status.HTTP_404_NOT_FOUND)
        
class ProductSearchView(APIView):

    def get(self, request):
        print(request.user)
        query = request.query_params.get('name', '')
        products = Product.objects.filter(description__icontains=query)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ProductRateView(APIView):

    def post(self, request, pk):
        user = request.user
        product = Product.objects.get(id=pk)
        data = request.data
        try:
            prevrating =  Rating.objects.get(product=product, user=user)
            print(prevrating)
            prevrating.delete()
        except:
            pass
        Rating.objects.create(product=product, user=user, rating=data["rating"])

        return Response({"rating":data["rating"]}, status=status.HTTP_200_OK)
    
class ProductRatingsView(APIView):

    def get(self, request, pk):
        user = request.user
        product = Product.objects.get(id=pk)
        
        ratings = Rating.objects.filter(product=product)
        if ratings.count()==0:
            avg = 0
        else:
            avg = sum(rating.rating for rating in ratings) / ratings.count()
        print(avg)
        return Response({"rating":avg}, status=status.HTTP_200_OK)
    
class ProductOwnRatingView(APIView):

    def get(self, request, pk):
        user = request.user
        product = Product.objects.get(id=pk)
        try:
            rating = Rating.objects.get(product=product, user=user).rating
        except:
            rating = 0
        print(rating)
        return Response({"rating":rating}, status=status.HTTP_200_OK)


class ProductDetailView(APIView):

    def get(self, request, pk):
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductCreateView(APIView):

    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        user = request.user
        data = request.data

        product = {
            "name": data["name"],
            "description": data["description"],
            "price": data["price"],
            "stock": data["stock"],
            "image": data["image"],
        }

        serializer = ProductSerializer(data=product, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ProductDeleteView(APIView):

    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, pk):
        try:
            product = Product.objects.get(id=pk)
            product.delete()
            return Response({"detail": "Product successfully deleted."}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)


class ProductEditView(APIView):
    
    permission_classes = [permissions.IsAdminUser]

    def put(self, request, pk):
        data = request.data
        product = Product.objects.get(id=pk)
        
        updated_product = {
            "name": data["name"] if data["name"] else product.name,
            "description": data["description"] if data["description"] else product.description,
            "price": data["price"] if data["price"] else product.price,
            "stock": data["stock"],
            "image": data["image"] if data["image"] else product.image,
        }

        serializer = ProductSerializer(product, data=updated_product)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
