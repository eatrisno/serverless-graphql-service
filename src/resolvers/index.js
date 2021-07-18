import { hello, getAllListings, getAListing, ip} from "./query";
import { makeABooking, loginUser } from "./mutation";

export const resolvers = {
  Query: {
    ip: (root, args, context) => ip(args, context),
    hello: (root, args, context) => hello(args, context),
    getAllListings: (root, args, context) => getAllListings(args, context),
    getAListing: (root, args, context) => getAListing(args, context),
  },
  Mutation: {
    loginUser: (root, args, context) => loginUser(args, context),
    makeABooking: (root, args, context) => makeABooking(args, context),
  },
};
