const form = document.getElementById('cv-form')

const URL = 'https://jsonplaceholder.typicode.com/posts'

// функция для получения данных из формы
function serializeForm(formNode) {
	// у каждой формы есть поле elements в нем хранятся все значения из формы
	const { elements } = formNode
	// преобразуем их в массив тк это коллекция
	const data = Array.from(elements)
		.filter((item) => !!item.name) // убираем элементы без атрибута name
		.map((element) => {
			const { name, type } = element
		 // получаем значение чекбокса
			const value = type === 'checkbox' ? element.checked : element.value
			return { name, value }
		})
	return data
}

async function fetchData(url, data) {
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
		alert(`Request status: ${res.status}`)
	} catch (error) {
		alert(error?.message)
	}
}

function handleFormSubmit(event) {
	event.preventDefault()
	const data = serializeForm(this)
	fetchData(URL, data)
}

form.addEventListener('submit', handleFormSubmit)
