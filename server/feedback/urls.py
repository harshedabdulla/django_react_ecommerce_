from django.urls import path
from .views import submit_feedback

app_name = 'feedback'

urlpatterns = [
    path('submit-feedback/', submit_feedback, name='submit_feedback'),
]
