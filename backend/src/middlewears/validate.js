function validationMiddlewear(req, res, next) {
  const d = req.body.data;
  const pattern = /[http://]/;
  if (
    !d.title ||
    d.title !== String ||
    d.title.length < 1 ||
    d.title.length > 150
  )
    next(new ValidationError("Title is wrong or missing"));
  if (
    !d.description ||
    d.description !== String ||
    d.description.length < 1 ||
    d.description.length > 1500
  )
    next(new ValidationError("Description is wrong or missing"));
  if (
    !d.cover ||
    d.cover !== String ||
    d.cover.length < 1 ||
    d.cover.length > 50 ||
    !pattern.test(d.cover)
  )
    next(new ValidationError("Url is wrong or missing"));
  if (!d.rating || d.rating !== Number || d.rating <= 0 || d.rating > 5)
    next(new ValidationError("Rating is wrong or missing"));
  if (!d.year || d.year !== Number || d.year < 1886 || d.year > 2026)
    next(new ValidationError("Year is wrong or missing"));

  next();
}
