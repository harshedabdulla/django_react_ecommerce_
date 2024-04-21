from django.contrib.auth.models import User
from django.db import models
from product.models import Product

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    products = models.ManyToManyField(Product)
    
    def __str__(self):
        return f"Cart for {self.user.username}"
