from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryView.as_view(), name="category-list"),
    path('category-create/', views.CategoryCreateView.as_view(), name="category-create"),
]
