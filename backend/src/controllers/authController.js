import registerUserUseCase from "../useCases/registerUserUseCase.js"

async function registerUser(req, res, next){
  try {
    const {email, password} = req.body;
    const result = await registerUserUseCase(email, password);
    res.status(201).json(result)
  } catch (error) {
    next(error)
    
  }

}


export default {registerUser}









// import getVideoByIdUseCase from "../useCases/use-cases";
// import createVideoUseCase from "../useCases/use-cases";

// async function getVideoById(req, res, next) {
//   try {
//     const input = {
//       user: req.user,
//       data: {

//           filmID: req.params.id,
//           metaData: { ip: req.ip, userAgent: req.headers["user-agent"] },
//         }
//     };
//     const result = await getVideoByIdUseCase(input);
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// }

// async function createVideo(req, res, next) {
//   try {
//     const { user, body } = req;
//     const formattedInput = {
//         data: {
//             title: body.title,
//             description: body.description,
//             cover: body.cover,
//             rating: body.rating,
//             year: body.year,
//         },
//         user: user,
//     };
//     result = await createVideoUseCase(formattedInput);
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// }
