from rest_framework import serializers
from .models import Usuario, Tarefa

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class TarefaSerializer(serializers.ModelSerializer):
    id_user = serializers.CharField()  # Usamos CharField para aceitar o nome do usuário

    class Meta:
        model = Tarefa
        fields = '__all__'

    def create(self, validated_data):
        # Atribuir o usuário pelo nome (busca no banco)
        nome_user = validated_data.pop('id_user')  # Pega o nome do usuário
        try:
            id_user = Usuario.objects.get(nome=nome_user)  # Encontra o usuário pelo nome
        except Usuario.DoesNotExist:
            raise serializers.ValidationError(f"Usuário com nome '{nome_user}' não encontrado.")

        tarefa = Tarefa.objects.create(id_user=id_user, **validated_data)
        return tarefa

    def update(self, instance, validated_data):
        # Atualiza o nome do usuário
        nome_user = validated_data.pop('id_user', None)  # Pega o nome do usuário
        if nome_user:
            try:
                id_user = Usuario.objects.get(nome=nome_user)  # Encontra o usuário pelo nome
                instance.id_user = id_user  # Atualiza o usuário
            except Usuario.DoesNotExist:
                raise serializers.ValidationError(f"Usuário com nome '{nome_user}' não encontrado.")

        # Atualiza os outros campos da tarefa
        instance.descricao = validated_data.get('descricao', instance.descricao)
        instance.prioridade = validated_data.get('prioridade', instance.prioridade)
        instance.status = validated_data.get('status', instance.status)
        instance.nome_setor = validated_data.get('nome_setor', instance.nome_setor)

        instance.save()  # Salva as alterações
        return instance

