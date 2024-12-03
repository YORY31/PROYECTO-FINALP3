from flask import Flask, request, send_file
import matplotlib.pyplot as plt
import io

app = Flask(__name__)

@app.route('/generar-grafico', methods=['POST'])
def generar_grafico():
    data = request.json
    categorias = data['categorias']
    valores = data['valores']

    
    plt.figure(figsize=(8, 5))
    plt.bar(categorias, valores, color='skyblue')
    plt.title('Distribución de Gastos Mensuales')
    plt.xlabel('Categorías')
    plt.ylabel('Monto (DOP)')


    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()

    return send_file(img, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
