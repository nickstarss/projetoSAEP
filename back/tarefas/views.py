from rest_framework import viewsets
from .models import Usuario, Tarefa
from .serializers import UsuarioSerializer, TarefaSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Tarefa


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class TarefaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

@csrf_exempt
def delete_task(request, id_tarefa):
    if request.method == 'DELETE':
        try:
            tarefa = Tarefa.objects.get(id_tarefa=id_tarefa)
            tarefa.delete()
            return JsonResponse({'message': 'Tarefa deletada com sucesso!'}, status=200)
        except Tarefa.DoesNotExist:
            return JsonResponse({'error': 'Tarefa não encontrada!'}, status=404)
    return JsonResponse({'error': 'Método não permitido!'}, status=405)