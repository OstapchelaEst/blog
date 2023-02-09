class MongooseServices {
  async create(model, value) {
    return await model.create(value);
  }
  async findBy(fildName, value, model) {
    return await model.findOne({ [fildName]: value });
  }
  async findAndDeleteByID(model, id) {
    return await model.findByIdAndDelete(id);
  }
  async findByID(model, id) {
    return await model.findById(id);
  }
  async findAll(model, value = {}) {
    return await model.find(value);
  }
  async findAndDelete(model, fildName, value) {
    return await model.deleteOne({ [fildName]: value });
  }
}
export default new MongooseServices();
