interface AirdropsTag {
    airdropId: string;
    tagId: string;
}
export interface Tag {
    id: string;
    name: string;
    airdrops: AirdropsTag[];
}
