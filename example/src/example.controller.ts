import { Controller, Get } from "@nestjs/common"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"

@Controller("example")
@ApiTags("example")
export class ExampleController {
  @Get("get")
  @ApiOkResponse({
    schema: {
      type: "object",
      properties: {
        hello: {
          type: "string"
        }
      }
    }
  })
  getter() {
    return {
      hello: "world"
    }
  }

  @Get("post")
  @ApiOkResponse({
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string"
        }
      }
    }
  })
  setter() {
    return {
      message: "success"
    }
  }
}
