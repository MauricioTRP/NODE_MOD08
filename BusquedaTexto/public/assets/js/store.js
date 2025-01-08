console.log("Nuestra tienda de libros")

document.addEventListener("DOMContentLoaded", async () => {
  const books = document.getElementById('books')

  const response = await fetch('http://localhost:3000/books')
  const booksList = await response.json()
  console.log(booksList)

  books.innerHTML = booksTable(booksList)
})


const booksTable = (data) => {
  let body = ''

  data.forEach(book => {
    body += `
    <tr>
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.stock}</td>
    </tr>
    `
  })

  return `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Titulo</th>
          <th scope="col">Stock</th>
        </tr>
      </thead>
      <tbody>
        ${body}
      </tbody>
    </table>
  `
}