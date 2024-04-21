from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.db import models
from product.models import Product

class Order(models.Model):
    DELIVERY_STATUS_CHOICES = [
        ('delivered', 'Delivered'),
        ('in_transit', 'In Transit'),
        ('return_in_progress', 'Refund Delivery in Progress'),
        ('returned_to_seller', "Returned To Seller"),
        ('cancelled', 'Cancelled'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ("refund_pending", "Refund Pending"),
        ('completed', 'Completed'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=50, choices=PAYMENT_STATUS_CHOICES, default='Pending')
    delivery_status = models.CharField(max_length=50, choices=DELIVERY_STATUS_CHOICES, default='in_transit')
    cost = models.DecimalField(max_digits=8, decimal_places=2)  
    products = models.ManyToManyField(Product)

    def __str__(self):
        return f"Order {self.id} by {self.user.user.username}"
