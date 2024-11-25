from rest_framework import serializers
from .models import Usuario, Tarefa

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'


class TarefaSerializer(serializers.ModelSerializer):
    id_user = serializers.CharField(source='id_user.nome')
    class Meta:
        model = Tarefa
        fields = '__all__'