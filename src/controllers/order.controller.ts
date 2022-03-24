import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from '#services/order.service';
import { createOrderDto } from '#dto/order/order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Get all orders
  @Get()
  async getAllOrders() {
    return await this.orderService.all();
  }

  @Post()
  async createOrder(@Body() createOrder: createOrderDto) {
    return await this.orderService.createOrder(createOrder);
  }

  @Get('/:id')
  async getOrderByID(@Param('id') id: number) {
    return await this.orderService.findByID(id);
  }

  @Post('/:id/cancel')
  async cancel(@Param('id') id: number) {
    return await this.orderService.cancelOrder(id);
  }
}
