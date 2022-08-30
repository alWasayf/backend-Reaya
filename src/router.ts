import helloWorldController, {
  // acceptAppointment,
  addBabysitter,
  addIndividual,
  bookAppointment,
  deleteBabysitter,
  // cancelAppointment,
  // deleteBabysitter,
  // deleteIndividual,
  findUser,
  getAllAppointments,
  getAllBabysitters,
  rateBabysitter,
  updateAppointmentStatus,
  updateBabysitter,
  updateIndividual,
} from "./controller/allControllers";

export async function router(fastify: any) {
  fastify.register(helloWorldController, { prefix: "/" });
  // find user by phone number

  fastify.register(findUser, { prefix: "api/user/" });
  // individual
  fastify.register(addIndividual, { prefix: "api/individual/add/" });
  // fastify.register(deleteIndividual, { prefix: "api/individual/delete/" });
  fastify.register(updateIndividual, { prefix: "api/individual/update/" });
  // fastify.register(getAllIndividuals, { prefix: "api/individual/all/" });

  //  babysitter
  fastify.register(addBabysitter, { prefix: "api/babysitter/add/" });
  fastify.register(deleteBabysitter, { prefix: "api/babysitter/delete/" });
  fastify.register(getAllBabysitters, { prefix: "api/babysitter/all/" });
  fastify.register(rateBabysitter, { prefix: "api/babysitter/rate/" });
  fastify.register(updateBabysitter, { prefix: "api/babysitter/update/" });

  // appointment
  fastify.register(bookAppointment, { prefix: "api/appointment/make/" });
  fastify.register(getAllAppointments, { prefix: "api/appointment/all/" });
  fastify.register(updateAppointmentStatus, {
    prefix: "api/appointment/update/",
  });
  // fastify.register(acceptAppointment, { prefix: "api/appointment/accept/" });
  // fastify.register(rejectAppointment, { prefix: "api/appointment/reject/" });
  // fastify.register(cancelAppointment, { prefix: "api/appointment/cancel/" });
}
