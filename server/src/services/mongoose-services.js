class MongooseServices {
  async create(model, value) {
    return await model.create(value);
  }
  async findBy(name, value, model) {
    return await model.findOne({ [name]: value });
  }
  async findAndDeleteByID(model, id) {
    return await model.findByIdAndDelete(id);
  }
  async findAll(model, value = {}) {
    return await model.find(value);
  }
}
export default new MongooseServices();
