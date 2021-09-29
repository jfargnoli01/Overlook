export default getRooms = async () => {
  return fetch(`http://localhost:3001/api/v1/rooms`)
  .then(response => response.json())
}