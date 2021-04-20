class BaseService {
    constructor(model) {
      this.model = model
    }
  
    create(resource) {
      return this.model.create(resource)
    }
  
    update(id, updateParams) {
      return this.model.findByIdAndUpdate(id, { $set: updateParams}, {new: true})
    }
  
    index(options = {}, page, perPage) {
      return this.model.find(options).skip((page - 1) * perPage).limit(perPage).sort({ date: -1 }).exec();
    }

    findOne(options = {}){
        return this.model.findOne(options).exec();
    }
  
    show(field, value) {
      return this.model.find({ [field]: value }).exec();
    }
  
    remove(options = {}) {
      return this.model.deleteOne(options).exec();
    }
  }
  
  export default BaseService