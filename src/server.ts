import { fastifyCors } from "@fastify/cors"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { fastify } from "fastify"
import { type ZodTypeProvider, jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { env } from "./env"
import { accessInviteLinkRoute } from "./routes/access-invite-link-route"
import { getRankingRoute } from "./routes/get-ranking-route"
import { getSubscriberInviteClicksRoute } from "./routes/get-subscriber-invite-clicks-route"
import { getSubscriberInvitesCountRoute } from "./routes/get-subscriber-invites-count-route"
import { getSubscriberRankingPositionRoute } from "./routes/get-subscriber-ranking-position-route"
import { subscibeToEventRoute } from "./routes/subscrib-to-event-route"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: env.CORS_ORIGIN,
})

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "NLW Connect",
            version: "0.0.1"
        }
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

app.register(subscibeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInvitesCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`Server is running on port ${env.PORT}`)
})