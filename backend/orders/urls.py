from django.urls import path
from orders import views


urlpatterns = [
    path('orders/', views.OrderView.as_view(), name="orders-list"),
    path('order-create/', views.CreateOrderView.as_view(), name="orders-create"),
    path('order/update/<int:pk>/', views.UpdateOrderStatusView.as_view(), name="update-order-status"),
]