// Importa o módulo 'http' nativo do Node.js para criar servidores web
import http from 'http'


// Cria um servidor HTTP
// A função passada como parâmetro será executada a cada nova requisição recebida
const server = http.createServer((req, res) => {
    // Exibe uma mensagem no terminal sempre que uma requisição chega
    console.log("chegou uma requisicao para: " + req.url)

    // Define o cabeçalho da resposta como texto simples
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')

    // Roteamento simples para três rotas
    if (req.url === '/') {
        res.end("Bem-vindo à página inicial!")
    } else if (req.url === '/sobre') {
        res.end("Esta é a página Sobre.")
    } else if (req.url === '/contato') {
        res.end("Página de contato.")
    } else {
        // Para qualquer outra rota, retorna 404
        res.statusCode = 404
        res.end("Página não encontrada.")
    }
})


// Faz o servidor escutar na porta 3001
const PORT = 3001
server.listen(PORT)

// Exibe mensagem informando que o servidor está rodando
console.log(`Servidor rodando com HTTP na porta ${PORT}`)