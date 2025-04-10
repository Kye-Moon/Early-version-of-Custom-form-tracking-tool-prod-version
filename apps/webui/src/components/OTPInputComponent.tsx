import {InputOTP, InputOTPGroup, InputOTPSlot,} from "@/Primitives/OTPInput";
import {ControllerRenderProps} from "react-hook-form";

interface OTPFormProps {
	length: number
	field: ControllerRenderProps<any, any>
}

export default function OTPInputComponent({length, field, ...props}: OTPFormProps) {
	return (
		<InputOTP maxLength={length} {...field} {...props}>
			<InputOTPGroup>
				{[...Array(length)].map((_, index) => (
					<InputOTPSlot index={index}/>
				))}
			</InputOTPGroup>
		</InputOTP>

	)
}
