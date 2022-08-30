import { doc, getDocs, query, setDoc, where } from "@firebase/firestore";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getDoc, updateDoc } from "firebase/firestore";
import { AppointmentRequest } from "src/firebase/types/appointment";

import {
  appointmentsCol,
  babysittersCol,
  individualsCol,
} from "../firebase/composables/useDb";

export default async function helloWorldController(fastify: FastifyInstance) {
  fastify.get(
    "/",
    async function (_request: FastifyRequest, reply: FastifyReply) {
      reply.send({ message: "Hello World ❤️" });
    }
  );
}
export async function findUser(fastify: FastifyInstance) {
  fastify.post("/", async function (_request: any, reply: FastifyReply) {
    const { phoneNumber } = _request.body;

    // const individualDocs = doc(individualsCol);
    // const babysitterDocs = doc(babysittersCol);
    try {
      // search for individual if phone number is found in individual collection return user data and type is individual else search for babysitter if phone number is found in babysitter collection return user data and type is babysitter else return not found

      // Search for individual first
      {
        const phoneNumberQuery = query(
          individualsCol,
          where("phoneNumber", "==", phoneNumber)
        );

        const queryIndividualSnapshot = await getDocs(phoneNumberQuery);

        const result = queryIndividualSnapshot.docs.map((doc) => {
          return {
            type: "individual",
            id: doc.id,
            ...doc.data(),
          };
        });

        if (result[0]) {
          console.log(result[0]);
          reply.send({
            type: "individual",
            user: result[0],
          });
        }
      }

      //  Search for babysitter second
      {
        const phoneNumberQuery = query(
          babysittersCol,
          where("phoneNumber", "==", phoneNumber)
        );

        const queryBabysitterSnapshot = await getDocs(phoneNumberQuery);

        const result = queryBabysitterSnapshot.docs.map((doc) => {
          return {
            type: "babysitter",
            id: doc.id,
            ...doc.data(),
          };
        });

        if (result[0]) {
          console.log("result", result[0]);
          reply.send({
            type: "babysitter",
            user: result[0],
          });
        }
      }

      reply.send({ message: "User Not found" });
    } catch (error) {
      reply.send(error);
    }
  });
}

// Individual  -----------------------------------------------
export async function addIndividual(fastify: FastifyInstance) {
  fastify.post("/", async function (_request: any, reply: FastifyReply) {
    const { firstName, lastName, phoneNumber, numOfChild, address } =
      _request.body;

    const individualDocs = doc(individualsCol);
    try {
      await setDoc(individualDocs, {
        firstName,
        lastName,
        phoneNumber,
        numOfChild,
        address,
      });
      reply.send({ message: "Parent added", user: _request.body });
    } catch (error) {
      reply.send(error);
    }
  });
}
// export async function deleteIndividual(fastify: FastifyInstance) {
// //   fastify.delete("/", async function (_request: any, reply: FastifyReply) {
//     // get user id from req body
//     // then delete it from individual collection
//     const { id } = _request.body;
//     const individualDoc = doc(individualsCol, id);
//     try {
//       await deleteDoc(individualDoc);
//       reply.send({ message: "User deleted" });
//     } catch (error) {
//       reply.send({ message: error });
//     }
//   });
// }

export async function updateIndividual(fastify: FastifyInstance) {
  fastify.put("/", async function (_request: any, reply: FastifyReply) {
    // get user id from req body
    // then update it from individual collection
    const { id, firstName, lastName, numOfChild, phoneNumber, address } =
      _request.body;

    const individualDoc = doc(individualsCol, id);

    try {
      await updateDoc(individualDoc, {
        firstName,
        lastName,
        numOfChild,
        phoneNumber,
        address,
      });

      reply.send({
        message: "User updated",
        user: { firstName, lastName, numOfChild, phoneNumber, address },
      });
    } catch (error) {
      reply.send({ message: error });
    }
  });
}
// export async function getAllIndividuals(fastify: FastifyInstance) {
// //   fastify.get("/", async function (_request: any, reply: FastifyReply) {
//     console.log(request", _request.body);
//     const individualDocs = await getDocs(individualsCol);
//     const result = individualDocs.docs
//       .map((indDoc) => {
//         const ind = indDoc.data();
//         return {
//           id: indDoc.id,
//           firstName: ind.firstName,
//           lastName: ind.lastName,
//           age: ind.age,
//           phoneNumber: ind.phoneNumber,
//         };
//       })
//       .sort((a, b) => a.age - b.age);
//     reply.send({ message: result });
//   });
// }

console.log(" userController");
// Babysitter  -----------------------------------------------
export async function addBabysitter(fastify: FastifyInstance) {
  fastify.post("/", async function (_request: any, reply: FastifyReply) {
    const {
      age,
      firstName,
      hourlyPrice,
      lastName,
      nationality,
      phoneNumber,
      skills,
      experience,
    } = _request.body;

    console.log("request.body", _request.body);

    const babysitterDocs = doc(babysittersCol);
    try {
      await setDoc(babysitterDocs, {
        age,
        firstName,
        hourlyPrice,
        lastName,
        nationality,
        phoneNumber,
        skills,
        experience,
        isDeleted: false,
        noOfRates: 0,
        totalRates: 0,
      });
      reply.send({ message: "Babysitter added", user: _request.body });
    } catch (error) {
      console.log("🚀 ~ error", error);
      reply.send({ message: error });
    }
  });
}
export async function getAllBabysitters(fastify: FastifyInstance) {
  fastify.get("/", async function (_request: any, reply: FastifyReply) {
    console.log("🚀 ~ _request", _request.body);
    try {
      const babysitterDocs = await getDocs(babysittersCol);
      const result = babysitterDocs.docs
        .map((babyDoc) => {
          const baby = babyDoc.data();
          return {
            id: babyDoc.id,
            age: baby.age,
            firstName: baby.firstName,
            hourlyPrice: baby.hourlyPrice,
            lastName: baby.lastName,
            nationality: baby.nationality,
            phoneNumber: baby.phoneNumber,
            skills: baby.skills,
            experience: baby.experience,
            isDeleted: baby.isDeleted,
            noOfRates: baby.noOfRates,
            totalRates: baby.totalRates,
            avatar: baby.avatar,
          };
        })
        .sort((a, b) => a.totalRates - b.totalRates);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  });
}
export async function rateBabysitter(fastify: FastifyInstance) {
  fastify.post("/", async function (_request: any, reply: FastifyReply) {
    const { appointmentId, nannyId, rate } = _request.body;

    const appointmentDoc = doc(appointmentsCol, appointmentId);
    const nannyDoc = doc(babysittersCol, nannyId);
    try {
      // update appointment rate
      await updateDoc(appointmentDoc, { isRated: true, rates: rate });

      const nanny = await getDoc(nannyDoc);
      const { noOfRates, totalRates } = nanny.data();

      // calc new total rates and no of rates
      const newTotalRates = totalRates + rate;
      const newNoOfRates = noOfRates + 1;

      // get new average rate
      const newAverageRate = newTotalRates / newNoOfRates;

      // convert to number and round to 2 decimal places
      const newAverageRateRounded = Number(newAverageRate.toFixed(2));

      await updateDoc(nannyDoc, {
        noOfRates: newNoOfRates,
        totalRates: newAverageRateRounded,
      });
      reply.send("Babysitter rated");
    } catch (error: any) {
      console.log("ssserror", error.message);
      reply.send(error);
    }
  });
}

export async function deleteBabysitter(fastify: FastifyInstance) {
  fastify.post("/", async function (_request: any, reply: FastifyReply) {
    const { id } = _request.body;
    // get user id from req body
    // then then change:
    // isDeleted: true
    // firstName: "Deleted"
    // lastName: "Account"
    // phoneNumber: ""
    try {
      const babysitterDoc = doc(babysittersCol, id);
      await updateDoc(babysitterDoc, {
        isDeleted: true,
        firstName: "Deleted",
        lastName: "Account",
        phoneNumber: "",
      });
      reply.send({ message: "Babysitter deleted" });
    } catch (error) {
      reply.send({ message: error });
    }
  });
}

export async function updateBabysitter(fastify: FastifyInstance) {
  fastify.put("/", async function (_request: any, reply: FastifyReply) {
    const {
      id,
      age,
      firstName,
      hourlyPrice,
      lastName,
      nationality,
      phoneNumber,
      skills,
      experience,
      avatar,
    } = _request.body;

    const babysitterDoc = doc(babysittersCol, id);
    try {
      await updateDoc(babysitterDoc, {
        age,
        firstName,
        hourlyPrice,
        lastName,
        experience,
        nationality,
        skills,
        avatar,
      });
      console.log("🚀 ~ newD");

      reply.send({
        message: "Babysitter updated",
        user: {
          age,
          firstName,
          hourlyPrice,
          lastName,
          experience,
          nationality,
          skills,
          avatar,
        },
      });
    } catch (error: any) {
      console.log(" error", error);
      console.log(" error", error.message);
      console.log(" error", error.data);
      reply.send({ message: error });
    }
  });
}

// Appointment -----------------------------------------------
export async function bookAppointment(fastify: FastifyInstance) {
  fastify.post(
    "/",
    async function (_request: AppointmentRequest, reply: FastifyReply) {
      const { individualId, babysitterId, date, numOfChildren, id, address } =
        _request.body;
      const appointmentDocs = doc(appointmentsCol);
      // console.log("appointmentDocs.id", appointmentDocs.id);

      const toBeBooked = Object.assign(
        {},
        {
          individual: individualId,
          babysitter: babysitterId,
          status: "pending",
          isRated: false,
          rates: 0,
          date,
          numOfChildren,
          address,
          id: appointmentDocs.id,
        }
      );

      try {
        await setDoc(appointmentDocs, toBeBooked);

        reply.send({
          message: "Appointment booked",
          appointment: {
            individual: individualId,
            babysitter: babysitterId,
            status: "pending",
            isRated: false,
            rates: 0,
            date,
            numOfChildren,
            address,
            id: appointmentDocs.id,
          },
        });
      } catch (error: any) {
        console.log("error", error.message);
        reply.send({ message: error.message });
      }
    }
  );
}
export async function getAllAppointments(fastify: FastifyInstance) {
  fastify.get("/", async function (_request: any, reply: FastifyReply) {
    console.log(" request", _request.body);

    // get all babysitters
    const babysitterDocs = await getDocs(babysittersCol);
    const resultBabysitter = babysitterDocs.docs
      .map((babyDoc) => {
        const baby = babyDoc.data();
        return {
          id: babyDoc.id,
          age: baby.age,
          firstName: baby.firstName,
          hourlyPrice: baby.hourlyPrice,
          lastName: baby.lastName,
          nationality: baby.nationality,
          phoneNumber: baby.phoneNumber,
          skills: baby.skills,
          experience: baby.experience,
          isDeleted: baby.isDeleted,
          noOfRates: baby.noOfRates,
          totalRates: baby.totalRates,
          avatar: baby.avatar,
        };
      })
      .sort((a, b) => a.totalRates - b.totalRates);

    // get all individuals
    const individualDocs = await getDocs(individualsCol);
    const resultIndividual = individualDocs.docs.map((indiDoc) => {
      const indi = indiDoc.data();
      return {
        id: indiDoc.id,
        firstName: indi.firstName,
        lastName: indi.lastName,
        phoneNumber: indi.phoneNumber,
        numOfChild: indi.numOfChild,
        address: indi.address,
      };
    });

    try {
      const appointmentDocs = await getDocs(appointmentsCol);
      const resultAppointment = appointmentDocs.docs.map((appointmentDoc) => {
        const appointment = appointmentDoc.data();

        return {
          id: appointmentDoc.id,
          individual: resultIndividual.find(
            (individual) => individual.id === appointment.individual
          ),
          babysitter: resultBabysitter.find(
            (babysitter) => babysitter.id === appointment.babysitter
          ),
          rates: appointment.rates,

          status: appointment.status,
          isRated: appointment.isRated,
          date: appointment.date,
          numOfChildren: appointment.numOfChildren,
          address: appointment.address,
        };
      });

      reply.send(resultAppointment);
    } catch (error) {
      reply.send(error);
    }
  });
}
export async function updateAppointmentStatus(fastify: FastifyInstance) {
  fastify.put("/", async function (_request: any, reply: FastifyReply) {
    const { appointmentId, status } = _request.body;
  
    const appointmentDocs = doc(appointmentsCol, appointmentId);
    try {
      await updateDoc(appointmentDocs, { status });
      reply.send({ message: "Appointment status updated" });
    } catch (error: any) {
      reply.send({ message: error.data.message });
    }
  });
}
