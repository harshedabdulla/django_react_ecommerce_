from django.db import models
from category.models import Category  # Import the Category model
from django.contrib.auth.models import User

class Product(models.Model):

    name = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    stock = models.BooleanField(default=False)
    image = models.ImageField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class Rating(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(null=True, blank=True)


