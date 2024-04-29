from django.urls import path
from orders import views


urlpatterns = [
    path('orders/', views.OrderView.as_view(), name="orders-list"),
    path('order-create/', views.CreateOrderView.as_view(), name="orders-create"),
    path('paymenthandler/', views.paymenthandler, name="orders-create")
]