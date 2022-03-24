import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '#entities/user/user.entity';
import { ShiftEntity } from '#entities/staff/shift.entity';
import { createUserDto, updateUserDto } from '#dto/user/user.dto';
import { createStaffShiftDto } from '#dto/staff/shift.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ShiftEntity)
    private readonly shiftRepository: Repository<ShiftEntity>,
  ) {}

  async all(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async create(dto: createUserDto) {
    const userExist = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if (userExist) {
      throw new ConflictException('User already exists');
    }

    const userDto = UserEntity.fromDto(dto);

    return await this.userRepository.save(userDto);
  }

  async update(dto: updateUserDto) {
    return this.userRepository.update(dto.id, dto);
  }

  // VipService
  async updateScore(id: number, score: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.point = score;
    return await this.userRepository.save(user);
  }

  async resetScore(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Usre not found');
    }
    user.point = 0;
    return await this.userRepository.save(user);
  }

  // Chấm công
  async chamCong(id: number, dto: createStaffShiftDto) {
    const staffExist = await this.userRepository.findOne({
      where: { id },
    });

    if (!staffExist) {
      throw new NotFoundException('Staff not exist');
    }

    const shiftEntity = ShiftEntity.fromDto(id, dto);
    return await this.shiftRepository.save(shiftEntity);
  }
}
