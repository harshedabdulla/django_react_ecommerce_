import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Feedback

@csrf_exempt
def submit_feedback(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        feedback_message = data.get('feedback', '')
        
        # Save the feedback to the database
        feedback = Feedback(message=feedback_message)
        feedback.save()
        
        return JsonResponse({'message': 'Feedback submitted successfully'}, status=201)
    return JsonResponse({'error': 'Invalid request'}, status=400)
