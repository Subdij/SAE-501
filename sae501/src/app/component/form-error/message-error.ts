export interface MessageError{
    condition: () => boolean | undefined,
    message: string
}