import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { CustomResponse } from "./backend/types/api/CustomResponse";
import type { Middleware } from "./backend/types/api/Middleware";
import { corsMiddleware } from "./middleware/corsMiddleware";

// see : https://nextjs.org/docs/app/building-your-application/routing/middleware#convention
// export const config = {
//   matcher: ["/api/:path*"],
// };

export async function middleware(
  request: NextRequest,
): Promise<NextResponse | undefined> {
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);

  // to get pathname in generateMetadata ,see: https://github.com/vercel/next.js/discussions/50189
  requestHeaders.set("x-url-pathname", pathname);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (request.nextUrl.pathname.startsWith("/api")) {
    // put middleware, order is important, localsMiddleware will delete
    await [corsMiddleware].reduce(
      async (accumulate, currentMiddleware: Middleware) => {
        // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
        // This line will wait for the last async function to finish.
        // The first iteration uses an already resolved Promise
        // so, it will immediately continue.
        await accumulate;
        await currentMiddleware(request, response as CustomResponse);
      },
      Promise.resolve(),
    );
  }

  return response;
}
