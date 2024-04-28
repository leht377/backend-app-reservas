export abstract class TransationManager {
  abstract startSession(): Promise<unknown>
  abstract commit(session: unknown): Promise<void>
  abstract abort(session: unknown): Promise<void>
}
