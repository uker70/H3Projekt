import { Pipe, PipeTransform } from '@angular/core';
import { UserLevel } from 'src/app/models/user/user.model';

@Pipe({
  name: 'userLevel'
})
export class UserLevelPipe implements PipeTransform {

  transform(value: UserLevel, ...args: unknown[]): string {
    
    return UserLevel[value] ?? 'unknown';
  }

}
