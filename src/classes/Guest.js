class Guest {
  constructor(id, name) {
    this.name = name;
    this.id = id;
  }

  logInfo() {
    console.log(this.name, this.id);
  }
};

export default Guest;