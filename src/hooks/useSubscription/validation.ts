import * as yup from 'yup';

export const teamScoresResponseValidation = yup.array().of(yup.object().shape({
  _id: yup.string().required(),
  name: yup.string().required(),
  members: yup.array().of(yup.object().shape({
    session: yup.string().required(),
    clicks: yup.number().required(),
  })).required(),
}))

export const teamScoresRequestValidation = yup.object().shape({
  team: yup.string().required(),
  session: yup.string().required(),
  clicks: yup.number().required(),
})
