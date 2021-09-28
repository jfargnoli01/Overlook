class Dashboard {
  constructor(rooms) {
    this.date = JSON.stringify(new Date())
      .split('T')[0]
      .split('"')[1]
      .split('-')
      .join('/'); 
    this.rooms = rooms;
  }

  filterRoomByType = () => {
    
  }

  filterByDate = () => {
    console.log(this.date);
  }
};

export default Dashboard;