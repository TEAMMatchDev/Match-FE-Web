export interface RequestPayAdditionalResponse {
    apply_num?: string
    vbank_num?: string
    vbank_name?: string
    vbank_holder?: string | null
    vbank_date?: number
}

export interface RequestPayResponse extends RequestPayAdditionalResponse {
    success: boolean
    error_code: string
    error_msg: string
    imp_uid: string | null
    merchant_uid: string
    pay_method?: string
    paid_amount?: number
    status?: string
    name?: string
    pg_provider?: string
    pg_tid?: string
    buyer_name?: string
    buyer_email?: string
    buyer_tel?: string
    buyer_addr?: string
    buyer_postcode?: string
    custom_data?: any //결제사가 임의로 커스텀하는 object라서 일단 any 처리
    paid_at?: number
    receipt_url?: string
}