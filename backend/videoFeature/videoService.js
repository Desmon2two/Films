import videoModel from "./videoModel";

async function create(params) {
  const schema = {
    ...params,
    rating: params.rating || 0,
    createdAt: Date.now(),
  };
  const video = await videoModel.create(schema);
  return video;
}
async function getById(id) {
  const video = await videoModel.getByID(id);
  if (!video) return null;
  return video;
}
async function getAll() {
  const result = await videoModel.getAll();
  return result;
}
async function put(id, params) {
  const allowedFields = ["Title", "Description", "Cover"];

  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([key]) => allowedFields.includes(key)),
  );

  const result = await videoModel.update(id, cleaned);
  return result;
}
async function del(id) {
  const result = await videoModel.del(id);
  return result;
};

export default { create, getById, getAll, put, del}
