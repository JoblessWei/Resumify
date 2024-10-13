import { Button } from "@/components/ui/button";

const NextPageButton = ({ onNextClicked }: { onNextClicked: () => void }) => <Button variant="outline" className="absolute bottom-4 right-4" onClick={onNextClicked}>Next pages</Button>

export default NextPageButton