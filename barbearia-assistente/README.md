Pasta/Arquivo	Para que serve

app/	                Onde fica todo o código principal. É aqui que a mágica acontece.

routes.py	            Define os "caminhos" que recebem as mensagens do WhatsApp.

chatbot.py	            Lógica de como o assistente responde, consulta IA, etc.

scheduler.py	        Faz o agendamento/cancelamento no Google Calendar.

whatsapp_api.py        	Recebe e envia mensagens pelo WhatsApp (via API Twilio, 360dialog, etc).

database.py	            Cuida de salvar e consultar agendamentos (SQLite).

config/settings.py	    Guarda as chaves e senhas como: API do ChatGPT, Google, WhatsApp...

main.py	                Onde o programa começa a rodar. Ele junta tudo.

requirements.txt	    Lista as bibliotecas necessárias, como flask, openai, etc.

README.md	            Explica como o projeto funciona, ideal pra quando alguém mais quiser usar.

logs/	                Pode gravar erros ou mensagens importantes aqui.

tests/	                Se quiser automatizar testes depois.