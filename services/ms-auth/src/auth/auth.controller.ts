import { Controller, Get, InternalServerErrorException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  async getData() {
    try {
      const data = await this.authService.find();
      return { message: "Hello from Auth Service 1", data: data };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
