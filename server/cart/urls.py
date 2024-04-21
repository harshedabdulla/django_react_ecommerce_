from django.urls import path
from cart import views


urlpatterns = [
    path('cart/', views.CartView.as_view(), name="user-cart"),
    path('cart-add/<str:pk>/', views.AddProductToCartView.as_view(), name="add-product-to-cart"),
    path('cart-remove/', views.RemoveProductFromCartView.as_view(), name="remove-product-from-cart"),
]