import { FastifyInstance } from "fastify";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import { UserModel } from "../schemas/UserSchema";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const userRoutes = async (fastify: FastifyInstance) => {
  //register user
  fastify.post(
    "/register",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { username, email, password } = request.body as {
        username: string;
        email: string;
        password: string;
      };

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = new UserModel({
        username,
        email,
        password: hashedPassword,
      });

      try {
        await user.save();
        reply.send({ message: "User registered successfly" });
      } catch (error) {
        reply.status(500).send({ error: "Error registering user" });
      }
    }
  );

  //login user
  fastify.post(
    "/login",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      const user = (await UserModel.findOne({ email })) as User | null;

      if (!user)
        return reply.status(401).send({ error: "Invalid email or password" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return reply.status(401).send({ error: "Invalid email or password" });

      const token = fastify.jwt.sign({
        _id: user._id,
        username: user.username,
      });
      reply.send({ token });
    }
  );
};
