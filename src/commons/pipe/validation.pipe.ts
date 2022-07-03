import {ArgumentMetadata, ConflictException, Injectable, PipeTransform, Type} from '@nestjs/common';
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, {metatype}: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object, {skipMissingProperties: true});
        if (errors.length > 0) {
            throw new ConflictException('Validation failed');
        }
        return value;
    }

    private toValidate(metatype: Type): boolean {
        const types: Type[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
