import bcrypt from 'bcryptjs';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
  AfterLoad,
} from 'typeorm';

import { VipRank, UserRole, UserPosition } from '#interfaces/user.interface';
import { createUserDto } from '#dto/user/user.dto';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ length: 255, name: 'password', nullable: false })
  password: string;

  @Column({ name: 'firstName', nullable: false, length: 255 })
  firstname: string;

  @Column({ name: 'lastName', nullable: false, length: 255 })
  lastname: string;

  @Column({ name: 'idCard', nullable: true, length: 20 })
  idCard: string;

  @Column({ name: 'birthday', nullable: true, type: 'date' })
  birthday: Date;

  @Column({
    name: 'sex',
    nullable: false,
    enum: ['Nam', 'Nữ', 'Không xác định'],
    default: 'Không xác định',
  })
  sex: string;

  @Column({ name: 'mobile', length: 20, nullable: false, default: '' })
  mobile: string;

  @Column({ name: 'avatar', default: '', nullable: true })
  avatar: string;

  @Column({ name: 'isActive', default: 1, type: 'bit' })
  isActive: 1 | 0;

  @Column({ name: 'address', nullable: false, default: '' })
  address: string;

  @Column({ type: 'bigint', default: 0 })
  point: number;

  @Column({ enum: VipRank, default: VipRank.Standard })
  rank: string;

  @Column({ enum: UserPosition, default: UserPosition.USER })
  position: string;

  @Column({ enum: UserRole, default: UserRole.USER })
  role: string;

  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.previousPassword);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async updateRank() {
    if (this.point >= 100) {
      this.rank = VipRank.Bronze;
    } else if (this.point >= 500) {
      this.rank = VipRank.Silver;
    } else if (this.point >= 1000) {
      this.rank = VipRank.Gold;
    } else if (this.point >= 5000) {
      this.rank = VipRank.Platinum;
    } else if (this.point >= 10000) {
      this.rank = VipRank.Diamond;
    } else {
      this.rank = VipRank.Standard;
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  setRole() {
    this.position === UserPosition.USER
      ? (this.role = UserRole.USER)
      : (this.role = UserRole.STAFF);
  }

  static fromDto(dto: createUserDto) {
    const entity = new UserEntity();
    entity.email = dto.email;
    entity.firstname = dto.firstname;
    entity.lastname = dto.lastname;
    entity.mobile = dto.mobile;
    entity.birthday = dto.birthday;
    entity.idCard = dto.idCard;
    entity.password = dto.password;
    entity.address = dto.address;
    entity.avatar = dto.avatar;
    entity.position = dto.position;
    entity.point = dto.point;
    return entity;
  }
}
