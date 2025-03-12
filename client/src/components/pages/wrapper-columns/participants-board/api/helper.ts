import { UserParticipants } from './types';

export const sortedUsers = (users: UserParticipants[]) => users.sort((a, b) => a.firstName.localeCompare(b.firstName));
